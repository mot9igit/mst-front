<template>
  <section class="shipments" id="shipments">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>

    <!-- Шапка страницы -->
    <div class="shipments__header">
      <h1 class="shipments__header-title">
        <div class="shipments__header-title-wrapper">
          <i class="d-icon-angle-rounded-left shipments__header-title-icon"></i>
          <span>Мои отгрузки</span>
        </div>
        <div class="d-divider d-divider--vertical shipments__header-title-divider"></div>
        <span>Отгрузки (1)</span>
      </h1>

      <div class="shipments__header-actions">
        <div class="d-field-wrapper d-field-wrapper--vertical shipments__header-input-wrapper">
          <!-- TODO Вместо этого нужно будет переписать эти стили в компонент какой-нибудь либы, где есть инпут даты -->
          <label for="date" class="d-dropdown__label shipments__header-input-label"
            >Выберите диапазон дат
          </label>
          <div class="d-input d-input--light shipments__header-input">
            <input
              type="text"
              placeholder="__ __"
              name="date"
              class="d-input__field shipments__header-input-field"
            />
            <button class="d-icon-wrapper d-input__calendar-button shipments__header-input-button">
              <i class="d-icon-calendar3"></i>
            </button>
          </div>
        </div>

        <button class="d-button d-button-primary box-shadow-none shipments__header-actions-button">
          <i class="d-icon-plus-flat shipments__header-actions-button-icon"></i>
          Добавить отгрузку
        </button>
      </div>
    </div>

    <!-- Таблица -->
    <table
      class="d-table d-table--small d-table--full d-table--head-col-divider d-table--full-row-divider d-table--first-col-divider shipments__table"
    >
      <thead class="d-table__head shipments__table-head">
        <tr class="d-table__row shipments__table-row">
          <th class="d-table__head-col shipments__table-head-col">Номер отгрузки</th>
          <th class="d-table__head-col shipments__table-head-col">Склад</th>
          <th class="d-table__head-col shipments__table-head-col">Дата</th>
          <th class="d-table__head-col shipments__table-head-col">Дата окончания приема заказов</th>
          <th class="d-table__head-col shipments__table-head-col">Маршрут</th>
          <th class="d-table__head-col shipments__table-head-col">Заказы</th>
          <th class="d-table__head-col shipments__table-head-col">Статус</th>
          <th class="d-table__head-col shipments__table-head-col">
            <div class="shipments__table-header-button-container">
              <button class="shipments__table-button shipments__table-header-button">
                <i class="d-icon-eye"></i>
              </button>
              <button class="shipments__table-button shipments__table-header-button">
                <i class="d-icon-pen2"></i>
              </button>
              <button class="shipments__table-button shipments__table-header-button">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="d-table__body shipments__table-body">
        <tr class="d-table__row shipments__table-row">
          <!-- <td class="d-table__col shipments__table-col">48</td> -->
          <td class="d-table__col shipments__table-col">28</td>
          <td class="d-table__col shipments__table-col">Химки. Ленинградская. 29</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">
            Челябинская обл., г. Миасс - Санкт Петербург
          </td>
          <td class="d-table__col shipments__table-col">0</td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-badge-container">
              <div class="shipments__table-badge">В пути</div>
            </div>
          </td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-button-container">
              <button class="shipments__table-button">
                <i class="d-icon-eye"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-pen2"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr class="d-table__row shipments__table-row">
          <!-- <td class="d-table__col shipments__table-col">48</td> -->
          <td class="d-table__col shipments__table-col">28</td>
          <td class="d-table__col shipments__table-col">Химки. Ленинградская. 29</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">
            Челябинская обл., г. Миасс - Санкт Петербург
          </td>
          <td class="d-table__col shipments__table-col">0</td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-badge-container">
              <div class="shipments__table-badge">В пути</div>
            </div>
          </td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-button-container">
              <button class="shipments__table-button">
                <i class="d-icon-eye"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-pen2"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr class="d-table__row shipments__table-row">
          <!-- <td class="d-table__col shipments__table-col">48</td> -->
          <td class="d-table__col shipments__table-col">28</td>
          <td class="d-table__col shipments__table-col">Химки. Ленинградская. 29</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">
            Челябинская обл., г. Миасс - Санкт Петербург
          </td>
          <td class="d-table__col shipments__table-col">0</td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-badge-container">
              <div class="shipments__table-badge">В пути</div>
            </div>
          </td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-button-container">
              <button class="shipments__table-button">
                <i class="d-icon-eye"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-pen2"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr class="d-table__row shipments__table-row">
          <!-- <td class="d-table__col shipments__table-col">48</td> -->
          <td class="d-table__col shipments__table-col">28</td>
          <td class="d-table__col shipments__table-col">Химки. Ленинградская. 29</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">
            Челябинская обл., г. Миасс - Санкт Петербург
          </td>
          <td class="d-table__col shipments__table-col">0</td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-badge-container">
              <div class="shipments__table-badge">В пути</div>
            </div>
          </td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-button-container">
              <button class="shipments__table-button">
                <i class="d-icon-eye"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-pen2"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr class="d-table__row shipments__table-row">
          <!-- <td class="d-table__col shipments__table-col">48</td> -->
          <td class="d-table__col shipments__table-col">28</td>
          <td class="d-table__col shipments__table-col">Химки. Ленинградская. 29</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">
            Челябинская обл., г. Миасс - Санкт Петербург
          </td>
          <td class="d-table__col shipments__table-col">0</td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-badge-container">
              <div class="shipments__table-badge">В пути</div>
            </div>
          </td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-button-container">
              <button class="shipments__table-button">
                <i class="d-icon-eye"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-pen2"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr class="d-table__row shipments__table-row">
          <!-- <td class="d-table__col shipments__table-col">48</td> -->
          <td class="d-table__col shipments__table-col">28</td>
          <td class="d-table__col shipments__table-col">Химки. Ленинградская. 29</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">
            Челябинская обл., г. Миасс - Санкт Петербург
          </td>
          <td class="d-table__col shipments__table-col">0</td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-badge-container">
              <div class="shipments__table-badge">В пути</div>
            </div>
          </td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-button-container">
              <button class="shipments__table-button">
                <i class="d-icon-eye"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-pen2"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr class="d-table__row shipments__table-row">
          <!-- <td class="d-table__col shipments__table-col">48</td> -->
          <td class="d-table__col shipments__table-col">28</td>
          <td class="d-table__col shipments__table-col">Химки. Ленинградская. 29</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">05.06.2025 15:49:59</td>
          <td class="d-table__col shipments__table-col">
            Челябинская обл., г. Миасс - Санкт Петербург
          </td>
          <td class="d-table__col shipments__table-col">0</td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-badge-container">
              <div class="shipments__table-badge">В пути</div>
            </div>
          </td>
          <td class="d-table__col shipments__table-col">
            <div class="shipments__table-button-container">
              <button class="shipments__table-button">
                <i class="d-icon-eye"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-pen2"></i>
              </button>
              <div class="d-divider d-divider--vertical shipments__table-button-divider"></div>
              <button class="shipments__table-button">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Список отгрузок -->
    <div class="shipments__card-container">
      <div class="shipments__card">
        <div class="shipments__card-header">
          <div class="shipments__card-header-left">
            <p class="shipments__card-header-title">Отгрузка № 28</p>
            <div class="d-divider d-divider--vertical shipments__card-header-divider"></div>
            <div class="shipments__card-header-status">
              <span class="shipments__card-header-status-label">Статус:</span>
              <div class="shipments__card-header-status-badge">В пути</div>
            </div>
          </div>
          <div class="shipments__card-header-right">
            <i class="d-icon-angle-rounded-bottom shipments__card-header-right-dropdown"></i>

            <button class="shipments__card-header-right-button">
              <i class="d-icon-eye"></i>
            </button>
            <div
              class="d-divider d-divider--vertical shipments__card-header-right-button-divider"
            ></div>
            <button class="shipments__card-header-right-button">
              <i class="d-icon-pen2"></i>
            </button>
            <div
              class="d-divider d-divider--vertical shipments__card-header-right-button-divider"
            ></div>
            <button class="shipments__card-header-right-button">
              <i class="d-icon-trash"></i>
            </button>
          </div>
        </div>
        <div class="shipments__card-content">
          <div class="shipments__card-text">
            <i class="d-icon-cube shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Склад:</p>
            <p class="shipments__card-text-value">Химки. Ленинградская. 29</p>
          </div>
          <div class="shipments__card-text">
            <i class="d-icon-location-flat shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Маршрут:</p>
            <p class="shipments__card-text-value">Челябинская обл., г. Миасс - Санкт Петербург</p>
          </div>
          <div class="shipments__card-text-wrapper">
            <i class="d-icon-calendar3 shipments__card-text-icon"></i>

            <div class="shipments__card-text-container">
              <div class="shipments__card-text">
                <p class="shipments__card-text-label">Дата:</p>
                <p class="shipments__card-text-value">05.06.2025 15:49:59</p>
              </div>
              <div class="shipments__card-text">
                <p class="shipments__card-text-label">Дата окончания приема заказов:</p>
                <p class="shipments__card-text-value">05.06.2025 15:49:59</p>
              </div>
            </div>
          </div>
          <div class="shipments__card-text">
            <i class="d-icon-truck shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Заказы с маркетплейса:</p>
            <p class="shipments__card-text-value">0</p>
          </div>
        </div>
      </div>
      <div class="shipments__card">
        <div class="shipments__card-header">
          <div class="shipments__card-header-left">
            <p class="shipments__card-header-title">Отгрузка № 28</p>
            <div class="d-divider d-divider--vertical shipments__card-header-divider"></div>
            <div class="shipments__card-header-status">
              <span class="shipments__card-header-status-label">Статус:</span>
              <div class="shipments__card-header-status-badge">В пути</div>
            </div>
          </div>
          <div class="shipments__card-header-right">
            <i class="d-icon-angle-rounded-bottom shipments__card-header-right-dropdown"></i>

            <button class="shipments__card-header-right-button">
              <i class="d-icon-eye"></i>
            </button>
            <div
              class="d-divider d-divider--vertical shipments__card-header-right-button-divider"
            ></div>
            <button class="shipments__card-header-right-button">
              <i class="d-icon-pen2"></i>
            </button>
            <div
              class="d-divider d-divider--vertical shipments__card-header-right-button-divider"
            ></div>
            <button class="shipments__card-header-right-button">
              <i class="d-icon-trash"></i>
            </button>
          </div>
        </div>
        <div class="shipments__card-content">
          <div class="shipments__card-text">
            <i class="d-icon-cube shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Склад:</p>
            <p class="shipments__card-text-value">Химки. Ленинградская. 29</p>
          </div>
          <div class="shipments__card-text">
            <i class="d-icon-location-flat shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Маршрут:</p>
            <p class="shipments__card-text-value">Челябинская обл., г. Миасс - Санкт Петербург</p>
          </div>
          <div class="shipments__card-text-wrapper">
            <i class="d-icon-calendar3 shipments__card-text-icon"></i>

            <div class="shipments__card-text-container">
              <div class="shipments__card-text">
                <p class="shipments__card-text-label">Дата:</p>
                <p class="shipments__card-text-value">05.06.2025 15:49:59</p>
              </div>
              <div class="shipments__card-text">
                <p class="shipments__card-text-label">Дата окончания приема заказов:</p>
                <p class="shipments__card-text-value">05.06.2025 15:49:59</p>
              </div>
            </div>
          </div>
          <div class="shipments__card-text">
            <i class="d-icon-truck shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Заказы с маркетплейса:</p>
            <p class="shipments__card-text-value">0</p>
          </div>
        </div>
      </div>
      <div class="shipments__card">
        <div class="shipments__card-header">
          <div class="shipments__card-header-left">
            <p class="shipments__card-header-title">Отгрузка № 28</p>
            <div class="d-divider d-divider--vertical shipments__card-header-divider"></div>
            <div class="shipments__card-header-status">
              <span class="shipments__card-header-status-label">Статус:</span>
              <div class="shipments__card-header-status-badge">В пути</div>
            </div>
          </div>
          <div class="shipments__card-header-right">
            <i class="d-icon-angle-rounded-bottom shipments__card-header-right-dropdown"></i>

            <button class="shipments__card-header-right-button">
              <i class="d-icon-eye"></i>
            </button>
            <div
              class="d-divider d-divider--vertical shipments__card-header-right-button-divider"
            ></div>
            <button class="shipments__card-header-right-button">
              <i class="d-icon-pen2"></i>
            </button>
            <div
              class="d-divider d-divider--vertical shipments__card-header-right-button-divider"
            ></div>
            <button class="shipments__card-header-right-button">
              <i class="d-icon-trash"></i>
            </button>
          </div>
        </div>
        <div class="shipments__card-content">
          <div class="shipments__card-text">
            <i class="d-icon-cube shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Склад:</p>
            <p class="shipments__card-text-value">Химки. Ленинградская. 29</p>
          </div>
          <div class="shipments__card-text">
            <i class="d-icon-location-flat shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Маршрут:</p>
            <p class="shipments__card-text-value">Челябинская обл., г. Миасс - Санкт Петербург</p>
          </div>
          <div class="shipments__card-text-wrapper">
            <i class="d-icon-calendar3 shipments__card-text-icon"></i>

            <div class="shipments__card-text-container">
              <div class="shipments__card-text">
                <p class="shipments__card-text-label">Дата:</p>
                <p class="shipments__card-text-value">05.06.2025 15:49:59</p>
              </div>
              <div class="shipments__card-text">
                <p class="shipments__card-text-label">Дата окончания приема заказов:</p>
                <p class="shipments__card-text-value">05.06.2025 15:49:59</p>
              </div>
            </div>
          </div>
          <div class="shipments__card-text">
            <i class="d-icon-truck shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Заказы с маркетплейса:</p>
            <p class="shipments__card-text-value">0</p>
          </div>
        </div>
      </div>
      <div class="shipments__card">
        <div class="shipments__card-header">
          <div class="shipments__card-header-left">
            <p class="shipments__card-header-title">Отгрузка № 28</p>
            <div class="d-divider d-divider--vertical shipments__card-header-divider"></div>
            <div class="shipments__card-header-status">
              <span class="shipments__card-header-status-label">Статус:</span>
              <div class="shipments__card-header-status-badge">В пути</div>
            </div>
          </div>
          <div class="shipments__card-header-right">
            <i class="d-icon-angle-rounded-bottom shipments__card-header-right-dropdown"></i>

            <button class="shipments__card-header-right-button">
              <i class="d-icon-eye"></i>
            </button>
            <div
              class="d-divider d-divider--vertical shipments__card-header-right-button-divider"
            ></div>
            <button class="shipments__card-header-right-button">
              <i class="d-icon-pen2"></i>
            </button>
            <div
              class="d-divider d-divider--vertical shipments__card-header-right-button-divider"
            ></div>
            <button class="shipments__card-header-right-button">
              <i class="d-icon-trash"></i>
            </button>
          </div>
        </div>
        <div class="shipments__card-content">
          <div class="shipments__card-text">
            <i class="d-icon-cube shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Склад:</p>
            <p class="shipments__card-text-value">Химки. Ленинградская. 29</p>
          </div>
          <div class="shipments__card-text">
            <i class="d-icon-location-flat shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Маршрут:</p>
            <p class="shipments__card-text-value">Челябинская обл., г. Миасс - Санкт Петербург</p>
          </div>
          <div class="shipments__card-text-wrapper">
            <i class="d-icon-calendar3 shipments__card-text-icon"></i>

            <div class="shipments__card-text-container">
              <div class="shipments__card-text">
                <p class="shipments__card-text-label">Дата:</p>
                <p class="shipments__card-text-value">05.06.2025 15:49:59</p>
              </div>
              <div class="shipments__card-text">
                <p class="shipments__card-text-label">Дата окончания приема заказов:</p>
                <p class="shipments__card-text-value">05.06.2025 15:49:59</p>
              </div>
            </div>
          </div>
          <div class="shipments__card-text">
            <i class="d-icon-truck shipments__card-text-icon"></i>
            <p class="shipments__card-text-label">Заказы с маркетплейса:</p>
            <p class="shipments__card-text-value">0</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'

export default {
  name: 'WholesaleShipments',
  components: { breadcrumbs },
}
</script>
<style lang="scss"></style>
