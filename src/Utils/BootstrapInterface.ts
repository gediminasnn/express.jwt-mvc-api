import express from 'express';

export default interface BootstrapInterface {
  app: express.Application;
  listen(): void;
}
