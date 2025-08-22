import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './GroupPassForm.scss';

export interface GroupPassFormData {
  name: string;
  email: string;
  church: string;
  phone: string;
}

interface GroupPassFormProps {
  quantity: number;
  mode: string;
  onFormDataChange: (index: number, formData: GroupPassFormData) => void;
  onValidationChange?: (isValid: boolean) => void;
  formData?: GroupPassFormData[];
}

interface FormData {
  users: GroupPassFormData[];
}

export const GroupPassForm: React.FC<GroupPassFormProps> = ({
  quantity,
  mode,
  onFormDataChange,
  formData,
}) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      users: Array.from(
        { length: quantity },
        (_, index) =>
          formData?.[index] || {
            name: '',
            email: '',
            church: '',
            phone: '',
          }
      ),
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: 'users',
  });

  const watchedUsers = watch('users');

  // 當 quantity 或 formData 變化時更新表單
  useEffect(() => {
    const newUsers = Array.from(
      { length: quantity },
      (_, index) =>
        formData?.[index] || {
          name: '',
          email: '',
          church: '',
          phone: '',
        }
    );
    replace(newUsers);
  }, [quantity, formData, replace]);

  const handleBlur = async (index: number) => {
    await trigger([
      `users.${index}.name`,
      `users.${index}.email`,
      `users.${index}.church`,
      `users.${index}.phone`,
    ]);
  };


  if (quantity === 0) {
    return null;
  }

  return (
    <div className="group-pass-form">
      <p className="group-pass-form-title">請填寫實際使用此票券者之資訊：</p>
      {fields.map((field, index) => (
        <details key={field.id} className="group-pass-form-details">
          <summary>
            <span className="title">使用者{index + 1}</span>
            <svg
              className="icon arrow-up"
              viewBox="0 0 24 24"
              fill="black"
              width="24"
              height="24"
            >
              <path d="m7 14 5-5 5 5H7z" />
            </svg>
            <svg
              className="icon arrow-down"
              viewBox="0 0 24 24"
              fill="black"
              width="24"
              height="24"
            >
              <path d="m7 10 5 5 5-5H7z" />
            </svg>
          </summary>
          <div className="group-pass-form-content">
            <div className="group-pass-form-input">
              <div className="form-item">
                <div className="form-label">
                  <label htmlFor={`name-${index}`}>使用者姓名</label>
                </div>
                {mode === 'edit' ? (
                  <>
                    <input
                      id={`name-${index}`}
                      className={`form-input ${errors.users?.[index]?.name ? 'error' : ''}`}
                      type="text"
                      placeholder="請輸入使用者姓名"
                      {...register(`users.${index}.name`, {
                        required: '請輸入使用者姓名',
                        validate: value => value?.trim() ? true : '請輸入使用者姓名',
                      })}
                      onBlur={() => handleBlur(index)}
                      aria-label="請輸入使用者姓名"
                      aria-required
                    />
                    {errors.users?.[index]?.name && (
                      <span className="error-message">
                        {errors.users[index].name?.message}
                      </span>
                    )}
                  </>
                ) : (
                  <p>{watchedUsers?.[index]?.name}</p>
                )}
              </div>
              <div className="form-item">
                <div className="form-label">
                  <label htmlFor={`email-${index}`}>電子郵件</label>
                </div>
                {mode === 'edit' ? (
                  <>
                    <input
                      id={`email-${index}`}
                      className={`form-input ${errors.users?.[index]?.email ? 'error' : ''}`}
                      type="email"
                      placeholder="請輸入電子郵件"
                      {...register(`users.${index}.email`, {
                        required: '請輸入電子郵件',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: '請輸入有效的電子郵件格式',
                        },
                      })}
                      onBlur={() => handleBlur(index)}
                      aria-label="請輸入電子郵件"
                      aria-required
                    />
                    {errors.users?.[index]?.email && (
                      <span className="error-message">
                        {errors.users[index].email?.message}
                      </span>
                    )}
                  </>
                ) : (
                  <p>{watchedUsers?.[index]?.email}</p>
                )}
              </div>
            </div>
            <div className="group-pass-form-input">
              <div className="form-item">
                <div className="form-label">
                  <label htmlFor={`church-${index}`}>所屬教會名稱</label>
                </div>
                {mode === 'edit' ? (
                  <>
                    <input
                      id={`church-${index}`}
                      className={`form-input ${errors.users?.[index]?.church ? 'error' : ''}`}
                      type="text"
                      placeholder="請輸入所屬教會名稱"
                      {...register(`users.${index}.church`, {
                        required: '請輸入所屬教會名稱',
                        validate: value => value?.trim() ? true : '請輸入所屬教會名稱',
                      })}
                      onBlur={() => handleBlur(index)}
                      aria-label="請輸入所屬教會名稱"
                      aria-required
                    />
                    {errors.users?.[index]?.church && (
                      <span className="error-message">
                        {errors.users[index].church?.message}
                      </span>
                    )}
                  </>
                ) : (
                  <p>{watchedUsers?.[index]?.church}</p>
                )}
              </div>
              <div className="form-item">
                <div className="form-label">
                  <label htmlFor={`phone-${index}`}>所屬教會電話</label>
                </div>
                {mode === 'edit' ? (
                  <>
                    <input
                      id={`phone-${index}`}
                      className={`form-input ${errors.users?.[index]?.phone ? 'error' : ''}`}
                      type="tel"
                      placeholder="請輸入所屬教會電話"
                      {...register(`users.${index}.phone`, {
                        required: '請輸入所屬教會電話',
                        validate: value => value?.trim() ? true : '請輸入所屬教會電話',
                      })}
                      onBlur={() => handleBlur(index)}
                      aria-label="請輸入所屬教會電話"
                      aria-required
                    />
                    {errors.users?.[index]?.phone && (
                      <span className="error-message">
                        {errors.users[index].phone?.message}
                      </span>
                    )}
                  </>
                ) : (
                  <p>{watchedUsers?.[index]?.phone}</p>
                )}
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
};