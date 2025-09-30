import { useEffect } from 'react';
import { useMessageStore } from './stores';
import { MainPage } from './components/pages';

function App() {
  const createRoom = useMessageStore((state) => state.createRoom);

  useEffect(() => {
    // 初回起動時にデフォルトルームを作成
    createRoom('Default Chat');
  }, [createRoom]);

  return <MainPage />;
}

export default App;
