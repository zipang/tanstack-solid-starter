# Redraft Web App Development Roadmap

## 1. Project Setup

- [x] Create monorepo structure
- [x] Set up file-manager-services package
- [x] Set up Bun as the JavaScript runtime and package manager

## 2. Web App Foundation

- [x] Initialize a minimal web app inside `packages/redraft` with the Astro framework, Solid.js and bun as the javascript runtime
- [x] Add Panda CSS as the CSS-in-JS solution to implement the design system lib with styled JSX components
- [x] Configure ElysiaJS to expose backend services

## 3. Backend Development

- [ ] Expose the file-manager-services with ElysiaJS
- [ ] Develop API endpoints for file operations
- [ ] Implement authentication and authorization

## 4. Frontend Development

- [ ] Design and implement the app router with Astro
- [ ] Create the home page with the LOGIN button
- [ ] Create the `/login` page with social login options (Google, GitHub, etc.)
- [ ] Implement login and user session management
- [ ] Implement the theme and design system using PandaCSS
- [ ] Create layout and typography components that implement our design system following the same API as Chakra UI components (e.g., Box, Text, HStack, VStack, etc.)
- [ ] Create a `FileManagerView` component to display the files and directories in our file tree
- [ ] Create (or import an existing) rich text editor to edit markdown text files

## 5. Integration and Testing

- [ ] Connect frontend to backend API
- [ ] Implement error handling and user feedback
- [ ] Conduct thorough testing of all features

## 6. Documentation and Deployment

- [ ] Write user documentation
- [ ] Prepare deployment scripts
- [ ] Set up CI/CD pipeline

## 8. Launch and Maintenance

- [ ] Soft launch and gather initial user feedback
- [ ] Address any critical issues or bugs
- [ ] Plan for future features and improvements
