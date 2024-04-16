export const sayHello = ({ params }: any = {}) => {
  return 'hello world' + ', ' + params?.name + '!';
};
