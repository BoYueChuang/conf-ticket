import React from 'react';
import './Booking.scss';
import { QuantitySelector } from '../../components/common/QuantitySelector/QuantitySelector';
export const Booking: React.FC = () => {
  return (
    <div className="booking-container">
      <h1>選擇票券類型與數量</h1>
      <div className="booking-content">
        <div className="booking-content-item">
          <div className="booking-content-item-left">
            <img
              src="/src/assets/images/ticket-sample.png"
              alt=""
              className="ticket-pic"
            />
            <div className="ticket-info">
              <div className="ticket-info-title">
                <p>Regular Pass</p>
                <p>$2,800</p>
              </div>
              <ul className="ticket-info-list">
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>特會全場次 & WORKSHOP & 特會影片（一個月線上觀看權限）</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="booking-content-item-right">
            <QuantitySelector></QuantitySelector>
          </div>
        </div>
        <div className="booking-content-item">
          <div className="booking-content-item-left">
            <img
              src="/src/assets/images/ticket-sample.png"
              alt=""
              className="ticket-pic"
            />
            <div className="ticket-info">
              <div className="ticket-info-title">
                <p>Special A Pass</p>
                <p>$3,200</p>
              </div>
              <ul className="ticket-info-list">
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>特會全場次 & WORKSHOP & 特會影片（一個月線上觀看權限）</p>
                </li>
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>5/2 與 Wade Joye 牧師午餐及 Live QA</p>
                </li>
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>會場深度配有即時翻譯</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="booking-content-item-right">
            <QuantitySelector></QuantitySelector>
          </div>
        </div>
        <div className="booking-content-item">
          <div className="booking-content-item-left">
            <img
              src="/src/assets/images/ticket-sample.png"
              alt=""
              className="ticket-pic"
            />
            <div className="ticket-info">
              <div className="ticket-info-title">
                <p>Special B Pass</p>
                <p>$3,400</p>
              </div>
              <ul className="ticket-info-list">
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>特會全場次 & WORKSHOP & 特會影片（一個月線上觀看權限）</p>
                </li>
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>5/3 與 Wade Joye 牧師午餐及 Live QA</p>
                </li>
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>會場深度配有即時翻譯</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="booking-content-item-right">
            <QuantitySelector></QuantitySelector>
          </div>
        </div>
        <div className="booking-content-item">
          <div className="booking-content-item-left">
            <img
              src="/src/assets/images/ticket-sample.png"
              alt=""
              className="ticket-pic"
            />
            <div className="ticket-info">
              <div className="ticket-info-title">
                <p>Special B Pass</p>
                <p>$3,400</p>
              </div>
              <ul className="ticket-info-list">
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>特會全場次 & WORKSHOP & 特會影片（一個月線上觀看權限）</p>
                </li>
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>5/3 與 Wade Joye 牧師午餐及 Live QA</p>
                </li>
                <li className="ticket-info-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="10.0003"
                      cy="9.99935"
                      r="3.33333"
                      fill="#778793"
                    />
                  </svg>
                  <p>會場深度配有即時翻譯</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="booking-content-item-right">
            <QuantitySelector></QuantitySelector>
          </div>
        </div>
      </div>
    </div>
  );
};
