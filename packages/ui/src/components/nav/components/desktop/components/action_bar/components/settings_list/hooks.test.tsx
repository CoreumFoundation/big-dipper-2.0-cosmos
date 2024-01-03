import { act, cleanup, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useSettingList } from '@/components/nav/components/desktop/components/action_bar/components/settings_list/hooks';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('hook: useSettingList', () => {
  test('handles open correctly', () => {
    const { result } = renderHook(() => useSettingList(), {
      wrapper: RecoilRoot,
    });
    expect(result.current.open).toBe(false);

    act(() => result.current.handleOpen());
    expect(result.current.open).toBe(true);
  });

  test('handles close correctly', () => {
    const { result } = renderHook(() => useSettingList(), {
      wrapper: RecoilRoot,
    });
    expect(result.current.open).toBe(false);

    act(() => result.current.handleOpen());
    expect(result.current.open).toBe(true);

    act(() => result.current.handleClose());
    expect(result.current.open).toBe(false);
  });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
