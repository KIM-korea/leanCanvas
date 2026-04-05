import { useState, useEffect } from 'react';

import SearchBar from '../components/SearchBar';
import CanvasList from '../components/CanvasList';
import ViewToggle from '../components/ViewToggle';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';

import { getCanvases, createCanvas, deleteCanvas } from '../api/canvas';
import useApiRequest from '../hooks/useApiRequest';

function Home() {
  // const [Item, setItem] = useState([]);
  const [searchItem, setSearchItem] = useState();//초기값으로 undefined로 선언 해야 함
  const [isGridView, setIsGridView] = useState(true);

  const { isLoading, error, execute: fetchData, Item } = useApiRequest(getCanvases, { initialData: [] });
  const { isLoading: isLoadingCreate, exectue: createNewCanvas } = useApiRequest(createCanvas);

  useEffect(() => {
    fetchData({ title_like: searchItem },
    );
  }, [searchItem, fetchData])//검색창을 입력할 때 마다 fetch수행

  const handleSearchItem = e => {
    setSearchItem(e.target.value);
  };

  const handleDeleteItem = async (id) => {
    if (confirm('삭제 하시겠습니까?') === false) {
      return;
    }
    try {
      await deleteCanvas(id);
      fetchData({ title_like: searchItem });
    } catch (error) {
      alert(error.message);
    }
  }

  const handleCreateCanvas = async () => {
    createNewCanvas(null, {
      onSuccess: () => {
        fetchData({ title_like: searchItem },
        );
      },
      onError: (error) => alert(error.message)
    })
    // try {
    //   setIsLoadingCreate(true);
    //   await new Promise(resolver => setTimeout(() => resolver(true), 1000));
    //   await createCanvas();//createCanvas는 Promise객체를 반환한다. 여기에 await을 거는 순간 resolve안의 매개변수 값을 불러온다.
    //   fetchData({ title_like: searchItem });
    // } catch (error) {
    //   alert(error.message);
    // } finally {
    //   setIsLoadingCreate(false);
    // }

  }

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar
          searchItem={searchItem}
          handleSearchItem={handleSearchItem}
        />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>등록하기</Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={() => fetchData({ title_like: searchItem })} />}
      {(!isLoading && !error) && (<CanvasList
        filteredItems={Item || []}
        isGridView={isGridView}
        onDeleteItem={handleDeleteItem}
      />)}

    </>
  );
}

export default Home;
