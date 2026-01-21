import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { db } from '@/firebase';

type Note = {
  id: string;
  text: string;
  completed: boolean;
};

const Dashboard = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [apiMessage, setApiMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_BASE_URL, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const notesQuery = query(collection(db, 'notes'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as { text: string; completed: boolean };
        return {
          id: docSnap.id,
          text: data.text,
          completed: data.completed
        };
      });
      setNotes(items);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const loadApi = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/hello`);
        const data = await response.json();
        setApiMessage(data.message ?? 'Cloud Run is responding.');
      } catch (err) {
        setApiError('API is not reachable. Check your Cloud Run service URL.');
      }
    };

    loadApi();
  }, [apiBaseUrl]);

  const handleAddNote = async () => {
    if (!user || !newNote.trim()) {
      return;
    }

    await addDoc(collection(db, 'notes'), {
      text: newNote.trim(),
      completed: false,
      uid: user.uid,
      createdAt: serverTimestamp()
    });
    setNewNote('');
  };

  const toggleNote = async (note: Note) => {
    await updateDoc(doc(db, 'notes', note.id), {
      completed: !note.completed
    });
  };

  const removeNote = async (noteId: string) => {
    await deleteDoc(doc(db, 'notes', noteId));
  };

  return (
    <Box py={{ xs: 6, md: 8 }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
            <Stack spacing={1}>
              <Typography variant="h4">Dashboard</Typography>
              <Typography color="text.secondary">
                Signed in as {user?.email ?? 'user'}
              </Typography>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
            <Stack spacing={2}>
              <Typography variant="h6">Cloud Run API</Typography>
              {apiError ? <Alert severity="warning">{apiError}</Alert> : null}
              {apiMessage ? <Chip label={apiMessage} color="secondary" /> : null}
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
            <Stack spacing={2}>
              <Typography variant="h6">Your Firestore notes</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="New note"
                  value={newNote}
                  onChange={(event) => setNewNote(event.target.value)}
                  fullWidth
                />
                <Button variant="contained" onClick={handleAddNote}>
                  Add
                </Button>
              </Stack>
              <Divider />
              <Stack spacing={2}>
                {notes.length === 0 ? (
                  <Typography color="text.secondary">No notes yet. Add your first one.</Typography>
                ) : (
                  notes.map((note) => (
                    <Paper
                      key={note.id}
                      variant="outlined"
                      sx={{ p: 2, borderRadius: 3, display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            textDecoration: note.completed ? 'line-through' : 'none'
                          }}
                        >
                          {note.text}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {note.completed ? 'Completed' : 'Active'}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={() => toggleNote(note)}>
                          {note.completed ? 'Undo' : 'Done'}
                        </Button>
                        <Button size="small" color="error" onClick={() => removeNote(note.id)}>
                          Delete
                        </Button>
                      </Stack>
                    </Paper>
                  ))
                )}
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default Dashboard;
