import { useState, useCallback } from 'react';

export function useModal() {
  const [isShowCreate, setIsShowCreate] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);

  const closeCreate = useCallback(() => {
    setIsShowCreate(false);
  }, [isShowCreate]);

  const showCreate = useCallback(() => {
    setIsShowCreate(true);
  }, [isShowCreate]);

  const closeEdit = useCallback(() => {
    setIsShowEdit(false);
  }, [isShowEdit]);

  const showEdit = useCallback(() => {
    setIsShowEdit(true);
  }, [isShowEdit]);

  return { isShowEdit, showEdit, closeEdit,  isShowCreate, showCreate, closeCreate};
}
