import { createEslintConfig } from '@postpilot/config/eslint';

export default createEslintConfig({
  ignores: ['src/lib/*', 'src/components/ui/*'],
});
