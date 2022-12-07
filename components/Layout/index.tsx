import { Container, Content, PageContainer } from './styles';
import Sidebar from '@/components/Sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>{children}</PageContainer>
      </Content>
    </Container>
  );
}
