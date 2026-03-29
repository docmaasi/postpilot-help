/**
 * Combined platform info data — re-exports all platforms from split files.
 */

import { platformInfoPart1 } from './platform-info-1.js';
import { platformInfoPart2 } from './platform-info-2.js';

export const platformInfo = [...platformInfoPart1, ...platformInfoPart2];
