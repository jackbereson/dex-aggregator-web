export function Redirect(res: any, path: any) {
  res.writeHead(301, {
    Location: path,
  });
  res.end();
}
