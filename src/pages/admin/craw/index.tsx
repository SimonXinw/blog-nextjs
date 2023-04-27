import React, { useEffect, useState } from 'react';
import * as Service from '@/services';

function Craw() {
  const [list, setList]: any = useState([]);

  const getCraw = async () => {
    try {
      const res = await Service.getCraw({});

      setList(res?.data);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    getCraw();

    return () => {};
  }, []);

  return (
    <div>
      {list?.map((item: any, index: any) => (
        <img width={100} src={item} alt="yes" key={index} />
      ))}
    </div>
  );
}

export default Craw;
