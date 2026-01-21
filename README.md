# Helios SaaS Starter

## Project overview
A modern SaaS starter scaffold using React + Vite + TypeScript, Material UI, Firebase Authentication, Firestore, Google Cloud Run, and Cloud Functions, with GitHub Actions CI/CD.

## Directory structure
- `frontend/` React + Vite app with MUI, Firebase Auth, Firestore CRUD
- `backend/` Express API for Cloud Run
- `functions/` Firebase Cloud Functions (2nd gen) sample endpoints
- `cloudrun/` Cloud Run service definitions
- `.github/workflows/` CI/CD workflows for Cloud Run deploys
- `firebase.json`, `.firebaserc`, `firestore.rules`, `firestore.indexes.json`

## Setup instructions
### 1) Prerequisites
- Node.js 20+
- Firebase CLI (`npm i -g firebase-tools`)
- Google Cloud SDK (`gcloud`)

### 2) Create Firebase project and enable services
1. In Firebase Console, create a project.
2. Enable Authentication providers:
   - Google
   - Email/Password
3. Create a Firestore database.
4. In the Firebase Console, add a Web App and copy its config.
5. Update `.firebaserc` with your Firebase project ID.
6. Deploy Firestore rules and indexes:
   ```bash
   firebase login
   firebase use --add
   firebase deploy --only firestore
   ```

### 3) Configure frontend environment
```bash
cp frontend/.env.example frontend/.env
```
Fill in values from your Firebase Web App config and set:
- `VITE_API_BASE_URL` to your backend Cloud Run URL or `http://localhost:8080` for local dev.

### 4) Install dependencies
```bash
cd frontend
npm install
cd ../backend
npm install
cd ../functions
npm install
```

### 5) Configure Google Cloud SDK and APIs
Use the Google Cloud Console to create your project, a service account for CI/CD, and grant the required roles.
```bash
gcloud init
gcloud config set project YOUR_GCP_PROJECT_ID
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com firestore.googleapis.com
```

### 6) Create Artifact Registry repositories
```bash
gcloud artifacts repositories create saas-frontend \
  --repository-format=docker \
  --location=YOUR_REGION \
  --description="Frontend images"

gcloud artifacts repositories create saas-backend \
  --repository-format=docker \
  --location=YOUR_REGION \
  --description="Backend images"
```

## Development commands
### Frontend
```bash
cd frontend
npm run dev
```

### Backend (Cloud Run API)
```bash
cd backend
npm run dev
```

### Functions (emulator)
```bash
cd functions
npm run serve
```

## Deployment commands (Cloud Run + Firebase)
### Build and deploy backend to Cloud Run
```bash
cd backend
IMAGE=YOUR_REGION-docker.pkg.dev/YOUR_GCP_PROJECT_ID/saas-backend/saas-backend:manual

docker build -t "$IMAGE" .
docker push "$IMAGE"

gcloud run deploy saas-backend \
  --image "$IMAGE" \
  --region YOUR_REGION \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars CORS_ORIGIN="https://your-frontend-url"
```

### Build and deploy frontend to Cloud Run
```bash
cd frontend
IMAGE=YOUR_REGION-docker.pkg.dev/YOUR_GCP_PROJECT_ID/saas-frontend/saas-frontend:manual

docker build \
  --build-arg VITE_FIREBASE_API_KEY="your-firebase-api-key" \
  --build-arg VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com" \
  --build-arg VITE_FIREBASE_PROJECT_ID="your-firebase-project-id" \
  --build-arg VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com" \
  --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id" \
  --build-arg VITE_FIREBASE_APP_ID="your-app-id" \
  --build-arg VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id" \
  --build-arg VITE_API_BASE_URL="https://your-backend-url" \
  -t "$IMAGE" .

docker push "$IMAGE"

gcloud run deploy saas-frontend \
  --image "$IMAGE" \
  --region YOUR_REGION \
  --platform managed \
  --allow-unauthenticated
```

### Deploy Firebase Cloud Functions
```bash
cd functions
npm run build
firebase deploy --only functions
```

## Environment variables and secrets
- Frontend variables (`VITE_*`) are build-time values passed via `.env` or Docker build args.
- Backend uses runtime env vars in Cloud Run:
  - `CORS_ORIGIN` to control allowed origins.
- For local backend access to Firestore, use Application Default Credentials:
  ```bash
  gcloud auth application-default login
  ```

## Local testing and cloud testing
- Local frontend: `http://localhost:5173`
- Local backend: `http://localhost:8080/api/health`
- Cloud Run backend health check: `https://YOUR_BACKEND_URL/api/health`
- Cloud Functions test: `https://REGION-YOUR_PROJECT.cloudfunctions.net/helloFunction`

## CI/CD (GitHub Actions)
Workflows:
- `frontend-deploy.yml` builds and deploys frontend to Cloud Run
- `backend-deploy.yml` builds and deploys backend to Cloud Run

Required GitHub secrets:
- `GCP_SA_KEY` (service account JSON)
- `GCP_PROJECT_ID`
- `GCP_REGION`
- `CORS_ORIGIN`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_API_BASE_URL`

The service account needs these roles:
- Cloud Run Admin
- Artifact Registry Writer
- Cloud Build Editor
- Service Account User

## Linking Firebase config with frontend
1. In Firebase Console, create a Web App and copy its config values.
2. Paste values into `frontend/.env`.
3. Rebuild the frontend image to bake in updated `VITE_*` values.
