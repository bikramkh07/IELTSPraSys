type LogContext = Record<string, string | number | boolean | null | undefined>;

function serializeContext(context?: LogContext) {
  if (!context) return undefined;
  return Object.fromEntries(
    Object.entries(context).filter(([, value]) => value !== undefined),
  );
}

export const logger = {
  info(message: string, context?: LogContext) {
    console.info(JSON.stringify({ level: 'info', message, context: serializeContext(context) }));
  },
  warn(message: string, context?: LogContext) {
    console.warn(JSON.stringify({ level: 'warn', message, context: serializeContext(context) }));
  },
  error(message: string, error: unknown, context?: LogContext) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error(
      JSON.stringify({
        level: 'error',
        message,
        error: {
          name: err.name,
          message: err.message,
        },
        context: serializeContext(context),
      }),
    );
  },
};
