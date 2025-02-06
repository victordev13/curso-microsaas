export interface TypedFormData<T extends { [key: string]: FormDataEntryValue }>
  extends FormData {
  get<K extends Extract<keyof T, string>>(key: K): T[K] | null
  set<K extends Extract<keyof T, string>>(
    name: K,
    value: string | Blob,
    filename?: string,
  ): void
  append<K extends Extract<keyof T, string>>(
    name: K,
    value: string | Blob,
    filename?: string,
  ): void
}

export type FormReturn<T> = {
  error?: string,
  errors?: Partial<{
    [K in keyof T]: string | null
  }>
} | undefined | void
