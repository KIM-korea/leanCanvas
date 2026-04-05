import { useState } from 'react';

import SearchBar from '../components/SearchBar';
import CanvasList from '../components/CanvasList';
import ViewToggle from '../components/ViewToggle';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import CategoryFilter from '../components/CategoryFilter';

import { getCanvases, createCanvas, deleteCanvas } from '../api/canvas';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

function Home() {
  // const [Item, setItem] = useState([]);
  
  const [filter,setFilter] = useState({
    searchItem: null,
    category: null,
  });

  const handleFilter=(key,value)=>{
    setFilter(
      {...filter,
        [key]: value,
      })
  }

  const [isGridView, setIsGridView] = useState(true);

  const queryClient = useQueryClient();
  //데이터 조회
  const { data: Item, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchItem, filter.category],
    queryFn: () => getCanvases({ title_like: filter.searchItem, category: filter.category }),
    initialData: [],
  })

  //등록
  const { mutate: createNewCanvas, isPending: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['canvases'] }),
    onError: (error) => alert(error.message),
  })


  //삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['canvases'] }),
    onError: (error) => alert(error.message),
  })

  const handleDeleteItem = async (id) => {
    if (confirm('삭제 하시겠습니까?') === false) {
      return;
    }
    deleteCanvasMutation(id);
  }

  const handleCreateCanvas = async () => {
    createNewCanvas();
  }

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
          <SearchBar
            searchItem={filter.searchItem}
            handleSearchItem={(val)=>handleFilter('searchItem',val)}
          />
          <CategoryFilter category={filter.category} onChange={(val)=>handleFilter('category',val)}/>
        </div>
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>등록하기</Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {(!isLoading && !error) && (<CanvasList
        filteredItems={Item || []}
        isGridView={isGridView}
        searchText={filter.searchItem}
        onDeleteItem={handleDeleteItem}
      />)}

    </>
  );
}

export default Home;
