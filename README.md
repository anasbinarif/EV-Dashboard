
# EV Dashboard

This project provides a dashboard for simulating electric vehicle (EV) charge points usage. It allows shop owners to visualize energy consumption, peak power loads, and other key metrics to optimize the number and types of EV chargers for their parking spaces.


## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js**: v20.11.1 or later
- **Yarn**: Follow [Yarn installation guide](https://classic.yarnpkg.com/en/docs/install).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anasbinarif/ace-my-exam.git
   cd ev-dashboard
   ```

2. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

### Running the Development Server

To run the app in development mode, use the following command:

```bash
yarn dev
```

This will start the development server using **Vite**. Once started, you should see output similar to this:

```bash
VITE v3.0.0  ready in 500ms

Local: http://localhost:5173/
```

You can now open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

### Building the Project

To create a production build of the project, run the following command:

```bash
yarn build
```

This will generate optimized, minified files in the `dist/` directory, ready for deployment.

### Previewing the Production Build

If you want to preview the production build locally, you can use the following command after running `yarn build`:

```bash
yarn preview
```
