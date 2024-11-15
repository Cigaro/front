import { Button, Flex, Input } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { addItem } from './requests';

export interface Render {
  render: () => void;
}

export const AddItem = ({ render }: Render) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');

  const newItem = (value: string, status: boolean) => {
    const id = `${Math.floor(Math.random() * 100)}wsjfh`;
    addItem('/add', id, value, status).then((response) => {
      render();
    });
  };

  return (
    <Flex style={{ width: '51%', marginTop: '50px' }} vertical align='center'>
      <Title style={{ marginBottom: '50px' }}>ToDO List</Title>
      <Flex style={{ width: '100%' }} justify='flex-end'>
        <Button
          type='primary'
          onClick={() => {
            setShow(!show);
          }}
        >
          Add new
        </Button>
      </Flex>
      {show ? (
        <Flex style={{ width: '100%', marginTop: '20px' }}>
          <Input
            style={{ width: '100%', marginRight: '25px', marginLeft: '10px' }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button
            type='primary'
            onClick={() => {
              newItem(value, false);
              setValue('');
              setShow(false);
            }}
          >
            Add
          </Button>
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};
