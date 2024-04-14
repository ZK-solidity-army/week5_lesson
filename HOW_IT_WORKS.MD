# How It Works: A Guide for New Developers

Welcome to the project! This document aims to provide a comprehensive overview of the repository, its structure, and how you can contribute effectively. Let's dive in.

## Project Overview

This project is part of the Encode Club Solidity Bootcamp, specifically for Group 9. It's a decentralized application (dApp) focused on a lottery system built on Ethereum. The main components include smart contracts for the lottery logic and a Next.js frontend for user interaction.

### Key Components

- **Smart Contracts**: Located in `packages/hardhat`, these contracts handle the lottery logic, token management, and interactions on the blockchain.
- **Frontend**: The user interface is built with Next.js, located in `packages/nextjs`. It provides a way for users to interact with the smart contracts through a web interface.

## Repository Structure

- `packages/hardhat`: Contains the smart contracts and Hardhat configuration for compiling, testing, and deploying contracts.
- `packages/nextjs`: Houses the Next.js frontend application.
- `.github`: Contains GitHub Actions workflows for CI/CD processes.
- `CONTRIBUTING.md`: Guidelines for contributing to the project.

## Getting Started

To start contributing, you'll need to set up your development environment. Here's a quick guide:

1. Clone the repository.
2. Install dependencies with `yarn install`.
3. Copy the `.env.example` file to `.env` and fill in the necessary values.
4. Deploy smart contracts to a local or test network using `yarn deploy --network <network_name>`.
5. Start the frontend application with `yarn start:dev`.

## Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation, here's how to contribute:

1. Fork the repository.
2. Clone your fork and create a new branch with a descriptive name.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request (PR) against the main repository.

Please follow the [contribution guidelines](CONTRIBUTING.md) for more detailed instructions.

## Testing

Testing is crucial to ensure the reliability of the smart contracts. To run the tests:
