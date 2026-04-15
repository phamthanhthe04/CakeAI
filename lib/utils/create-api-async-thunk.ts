import {
  type AsyncThunk,
  createAsyncThunk,
  type Dispatch,
  type UnknownAction,
} from '@reduxjs/toolkit';
import { ApiError } from '@/lib/utils/api-error';

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch<UnknownAction>;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export function createApiAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: (arg: ThunkArg) => Promise<Returned>,
): AsyncThunk<Returned, ThunkArg, AsyncThunkConfig> {
  return createAsyncThunk<Returned, ThunkArg>(
    typePrefix,
    async (arg, thunkAPI) => {
      try {
        return await payloadCreator(arg);
      } catch (error) {
        const apiError = ApiError.from(error);

        return thunkAPI.rejectWithValue(apiError.serialize());
      }
    },
  );
}
