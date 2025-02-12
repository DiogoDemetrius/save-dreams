export const logRequest = (url: string, method: string, body?: any) => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    url,
    method,
    body
  }, null, 2));
};

export const logError = (error: Error, context: string) => {
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    context,
    error: {
      message: error.message,
      stack: error.stack
    }
  }, null, 2));
};