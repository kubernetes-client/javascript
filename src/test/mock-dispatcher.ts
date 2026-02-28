import { MockAgent } from 'undici';
import type { KubeConfig } from '../config.js';

export function createMockApplyFn(kc: KubeConfig, mockAgent: MockAgent): void {
    const origApply = kc.applySecurityAuthentication.bind(kc);
    kc.applySecurityAuthentication = async (context) => {
        await origApply(context);
        context.setDispatcher(mockAgent);
    };
}
