ARG NODE_VERSION=18.19.1

FROM node:${NODE_VERSION}-alpine


WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npm install -g @nestjs/cli
# Run the application as a non-root user.

# Copy the rest of the source files into the image.
COPY . .

RUN npx prisma generate


# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run start:dev
