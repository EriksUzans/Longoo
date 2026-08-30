# Use official Cypress base image containing Node, Chrome, and system dependencies
FROM cypress/included:13.6.0

# Set working directory inside the container
WORKDIR /app

# Copy dependency definition files
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Set environment variable to ensure reports directory exists
ENV CI=true

# Default command to run Cypress tests headlessly
CMD ["npx", "cypress", "run"]