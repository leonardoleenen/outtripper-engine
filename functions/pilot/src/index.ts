
export const helloWorld = (req: any, res: any) => {
    let message = req.query.message || req.body.message || 'Hello World!';
    res.status(200).send('Esta es la');
  }