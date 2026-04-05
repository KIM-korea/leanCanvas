import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import Button from '../components/Button';

const About = () => {
  
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['canvases'],
    queryFn: () => axios.get('http://localhost:8000/canvases').then(res => res.data),
    initialData: [],
  });//useQuery는 객체 반환

  const handleCreate = () => {
    createNewCanvas({title: 'new canvas'});
  }

  const { mutate:createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: (newCanvas) => axios.post('http://localhost:8000/canvases', newCanvas),
    onSuccess: () =>{
      queryClient.invalidateQueries(['canvases'])
    }//방금 생성했으니, 예전에 캐시해 둔 캔버스 목록은 믿지말고 다시 요쳥해라. get이 다시 실행된다. 
  })

  return (<div>
    <h2 className='text-3xl'> useQuery </h2>
    {isLoading && <p>Loading...</p>}
    {error && <p className='text-red-500'>Error: {error.message}</p>}
    {data.map(item => <li key={item.id}>{item.title}</li>)}\

    <h2 className='text-3xl'> useMutation </h2>
    {isLoadingCreate && <p>Loading...</p>}
    <Button onClick={handleCreate}>등록</Button>

  </div>);
};

export default About;
