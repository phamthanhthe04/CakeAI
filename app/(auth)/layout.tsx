import { App as AntdApp } from 'antd';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AntdApp>{children}</AntdApp>;
}
