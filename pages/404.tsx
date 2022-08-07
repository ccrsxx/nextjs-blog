import Error from 'next/error';

type NotFoundProps = {
  message?: string;
};

export default function NotFound({ message }: NotFoundProps): JSX.Element {
  return <Error statusCode={404} title={message} />;
}
