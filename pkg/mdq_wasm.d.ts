/* tslint:disable */
/* eslint-disable */
export function process_markdown(markdown_content: string, selector: string, options: MdqOptions): string;
export function start(): void;
export function console_log(s: string): void;
export class MdqOptions {
  free(): void;
  constructor();
  output_format(): string;
  set_output_format(format: string): void;
  set_wrap_width(width?: number | null): void;
  set_quiet(quiet: boolean): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_mdqoptions_free: (a: number, b: number) => void;
  readonly mdqoptions_new: () => number;
  readonly mdqoptions_output_format: (a: number) => [number, number];
  readonly mdqoptions_set_output_format: (a: number, b: number, c: number) => void;
  readonly mdqoptions_set_wrap_width: (a: number, b: number) => void;
  readonly mdqoptions_set_quiet: (a: number, b: number) => void;
  readonly process_markdown: (a: number, b: number, c: number, d: number, e: number) => [number, number, number, number];
  readonly console_log: (a: number, b: number) => void;
  readonly start: () => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
