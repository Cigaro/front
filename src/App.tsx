import React, { useEffect, useState } from 'react';
import Item from './modules/todoItem';
import { getItems, ItemData } from './modules/requests';
import { AxiosResponse } from 'axios';
import { Flex } from 'antd';
import { AddItem } from './modules/add';

function App() {
  const [data, setData] = useState<AxiosResponse>();

  const render = () => {
    getItems('/').then((response) => {
      setData(response);
    });
  };

  useEffect(() => {
    render();
    return () => {};
  }, [setData]);

  if (!data) return <></>;

  const itemsData = data.data as Array<ItemData>;

  return (
    <div className='App'>
      <Flex style={{ width: '100%' }} justify='center' vertical align='center'>
        <AddItem render={render} />
        <Flex vertical style={{ width: '50%' }}>
          {itemsData.map((item, index) => {
            return (
              <Item
                value={item.value}
                _id={item._id}
                status={item.status}
                key={item._id}
                render={render}
              />
            );
          })}
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
