/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
// @ts-ignore
import { createRouter as CCFRouter } from '@cloud-carbon-footprint/api/dist/api';
import { Config as BackstageConfig } from '@backstage/config';
import { convertConfig } from './convertConfig';

export interface RouterOptions {
  logger: Logger;
  config?: BackstageConfig;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.send({ status: 'ok' });
  });

  const ccfConfig = convertConfig(options.config);
  const ccfRouter = CCFRouter(ccfConfig);

  router.use(ccfRouter);
  router.use(errorHandler());
  return router;
}
