/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-default-export */
import type { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    transform: {
        '^.+\\.spec\\.(t|j)s$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.json',
            },
        ],
        '^.+\\.(t|j)s$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
            },
        ],
    },
    testTimeout: 120_000,
    testEnvironment: 'node',
    verbose: true,
    detectLeaks: false,
    detectOpenHandles: true,
    collectCoverage: true,
    collectCoverageFrom: ['**/*.ts', '!**/*.d.ts'],
    // coverageThreshold: {
    //     global: {
    //         statements: 60,
    //         branches: 60,
    //         functions: 60,
    //         lines: 60,
    //     },
    // },
    rootDir: './',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1',

    },
    coveragePathIgnorePatterns: ['<rootDir>/jest.config.ts', '.mock.ts', 'spec/','.*\\.config\\.ts$'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;