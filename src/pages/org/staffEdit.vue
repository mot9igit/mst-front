<template>

  <section class="lk-staff" id="lk-staff">
      <!-- Верхушка страницы -->
    <Toast />
    <div class="d-top">
      <breadcrumbs />
    </div>

    <div class="organization">
      <h1>Сотрудники</h1>
    </div>

    <Loader v-if="loading" />

    <div class="lk-staff-edit__header">
								<div class="lk-staff-edit__header-left">
									<h2 class="lk-staff-edit__header-title">
										Иванов Иван Иванович
									</h2>

									<div class="lk-staff-edit__header-contact-container">
										<a
											class="lk-staff-edit__header-contact"
											href="tel:+70000000000"
										>
											<i
												class="d-icon-telephone lk-staff-edit__header-contact-icon"
											></i>
											<span>+7 (000) 000-00-00</span>
										</a>

										<div
											class="d-divider d-divider--vertical lk-staff-edit__header-contact-divider"
										></div>

										<a
											class="lk-staff-edit__header-contact"
											href="mailto:andreev@tk-tehnolorg.ru"
										>
											<i
												class="d-icon-mail2 lk-staff-edit__header-contact-icon"
											></i>
											<span>andreev@tk-tehnolorg.ru</span>
										</a>
									</div>
								</div>

								<div class="lk-staff-edit__header-right">
									<p class="lk-staff-edit__header-right-label">
										Группы пользователя
									</p>
									<p class="lk-staff-edit__header-right-value">Администратор</p>
								</div>
							</div>

							<div class="lk-staff-edit__table">
								<div class="lk-staff-edit__table-row">
									<div class="lk-staff-edit__table-row-content">
										<p class="lk-staff-edit__table-label">
											Группа пользователя:
										</p>
										<p class="lk-staff-edit__table-value">Администратор</p>
									</div>
									<div class="lk-staff-edit__table-row-actions">
										<div
											class="d-divider d-divider--vertical lk-staff-edit__table-row-actions-divider"
										></div>
										<button class="lk-staff-edit__table-row-actions-button">
											<i class="d-icon-pen2"></i>
										</button>
									</div>
								</div>

								<div class="lk-staff-edit__table-row">
									<div class="lk-staff-edit__table-row-content">
										<p class="lk-staff-edit__table-label">Рабочий телефон:</p>
										<p class="lk-staff-edit__table-value">
											<i
												class="d-icon-telephone lk-staff-edit__table-value-icon"
											></i>
											+7 (000) 000-00-00
										</p>
									</div>
									<div class="lk-staff-edit__table-row-actions">
										<div
											class="d-divider d-divider--vertical lk-staff-edit__table-row-actions-divider"
										></div>
										<button class="lk-staff-edit__table-row-actions-button">
											<i class="d-icon-pen2"></i>
										</button>
									</div>
								</div>

								<div class="lk-staff-edit__table-row">
									<div class="lk-staff-edit__table-row-content">
										<p class="lk-staff-edit__table-label">Рабочий email:</p>
										<p class="lk-staff-edit__table-value">
											<i
												class="d-icon-mail2 lk-staff-edit__table-value-icon"
											></i>
											andreev@tk-tehnolorg.ru
										</p>
									</div>
									<div class="lk-staff-edit__table-row-actions">
										<div
											class="d-divider d-divider--vertical lk-staff-edit__table-row-actions-divider"
										></div>
										<button class="lk-staff-edit__table-row-actions-button">
											<i class="d-icon-pen2"></i>
										</button>
									</div>
								</div>
							</div>

							<div class="lk-staff-edit__operator">
								<p class="lk-staff-edit__operator-title">Оператор клиентов</p>

								<div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper">
									<label
										for="unlimitedCLients"
										class="d-radio lk-staff-edit__operator-radio"
									>
										<input
											type="checkbox"
											name="unlimitedCLients"
											id="unlimitedCLients"
											class="d-radio__input lk-staff-edit__operator-radio-input"
										/>
									</label>

									<label
										for="unlimitedCLients"
										class="d-radio__label lk-staff-edit__operator-radio-label"
										>Неограниченный круг клиентов
									</label>
								</div>

								<div class="lk-staff-edit__operator-address-wrapper">
									<p class="lk-staff-edit__operator-address">
										<i
											class="d-icon-location lk-staff-edit__operator-address-icon"
										></i>
										<span>УрФО, Москва, ООО “Стин”, Пром хрень снаб</span>
									</p>

									<div class="lk-staff-edit__operator-address-actions">
										<div class="d-divider d-divider--vertical lk-staff-edit__operator-address-actions-divider"></div>
										<button class="lk-staff-edit__operator-address-actions-button">
											<i class="d-icon-pen2"></i>
										</button>
									</div>
								</div>

								<div class="d-input d-input--light lk-staff-edit__operator-search">
									<input
										type="text"
										placeholder="Поиск города"
										name="date"
										class="d-input__field lk-staff-edit__operator-search-field"
									/>
									<div class="d-input__actions">
										<button
											class="d-icon-wrapper lk-staff-edit__operator-search-button"
										>
											<i class="d-icon-search-big"></i>
										</button>
									</div>
								</div>
							</div>

	</section>
</template>

<script>
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'ProfileStaffCreate',
  components: { Breadcrumbs, Loader }
}
</script>

<style lang="scss">

</style>
