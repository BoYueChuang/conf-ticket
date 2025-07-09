import React, { useEffect, useState } from 'react';
import { Select } from '../../components/common/Select/Select';
import { NotificationMessage } from '../../components/common/Notification/Notification';
import { apiService } from '../../api/fetchService';

interface Option {
  id: string;
  label: string;
}

export const Booking: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState('');

  const branchOptions: Option[] = [
    { id: 'taipei', label: 'The Hope 台北分部' },
    { id: 'taichung', label: 'The Hope 台中分部' },
    { id: 'online', label: 'The Hope 線上分部' },
    { id: 'others', label: '其他教會' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await apiService.users.getAll();
        console.log('Tickets data:', data);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1>購票頁面</h1>

      {/* 🎯 直接使用組件 + 傳入 options */}
      <Select
        options={branchOptions}
        value={selectedBranch}
        onChange={setSelectedBranch}
        placeholder="請選擇分部..."
      />

      <br />

      <input className="form-input" type="text" placeholder="請輸入分部名稱" />
      <br />
      <input type="checkbox" />
      <br />
      <NotificationMessage status="success" text="註冊成功！" />
    </div>
  );
};
