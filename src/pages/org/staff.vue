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

							<div class="lk-staff__header">
								<div class="d-input d-input--light lk-staff__header-search">
									<input
										type="text"
										placeholder="Поиск сотрудника"
										name="date"
										class="d-input__field lk-staff__header-search-field"
									/>
									<div class="d-input__actions">
										<button
											class="d-icon-wrapper lk-staff__header-search-button"
										>
											<i class="d-icon-search-big"></i>
										</button>
									</div>
								</div>

								<button
									class="d-button d-button-primary d-button--no-shadow lk-staff__header-button"
								>
									<i class="d-icon-plus-flat lk-staff__header-button-icon"></i>
									Новый сотрудник
								</button>
							</div>

							<div class="lk-staff__card-container">
								<div class="lk-staff__card">
									<div class="lk-staff__card-contact-container">
										<p class="lk-staff__card-name">Иванов Иван Иванович</p>
										<a class="lk-staff__card-contact" href="tel:+70000000000">
											<i
												class="d-icon-telephone lk-staff__card-contact-icon"
											></i>
											<span class="lk-staff__card-contact-value"
												>+7 (000) 000-00-00</span
											>
										</a>
										<a
											class="lk-staff__card-contact"
											href="mailto:andreev@tk-tehnolorg.ru"
										>
											<i class="d-icon-mail2 lk-staff__card-contact-icon"></i>
											<span class="lk-staff__card-contact-value"
												>andreev@tk-tehnolorg.ru</span
											>
										</a>
									</div>

									<div
										class="d-divider d-divider--vertical lk-staff__card-divider"
									></div>

									<div class="lk-staff__card-contact-wrapper">
										<p class="lk-staff__card-contact-label">Рабочий телефон</p>
										<a class="lk-staff__card-contact" href="tel:+70000000000">
											<i
												class="d-icon-telephone lk-staff__card-contact-icon"
											></i>
											<span class="lk-staff__card-contact-value"
												>+7 (000) 000-00-00</span
											>
										</a>
									</div>

									<div
										class="d-divider d-divider--vertical lk-staff__card-divider"
									></div>

									<div class="lk-staff__card-contact-wrapper">
										<p class="lk-staff__card-contact-label">Рабочий email</p>
										<a
											class="lk-staff__card-contact"
											href="mailto:andreev@tk-tehnolorg.ru"
										>
											<i class="d-icon-mail2 lk-staff__card-contact-icon"></i>
											<span class="lk-staff__card-contact-value"
												>andreev@tk-tehnolorg.ru</span
											>
										</a>
									</div>

									<div
										class="d-divider d-divider--vertical lk-staff__card-divider"
									></div>

									<div class="lk-staff__card-contact-wrapper">
										<p class="lk-staff__card-contact-label">
											Оператор клиентов
										</p>
										<div class="lk-staff__card-contact">
											УрФО, Москва, ООО «Стин», Пром хрень снаб
										</div>
									</div>

									<div
										class="d-divider d-divider--vertical lk-staff__card-divider"
									></div>

									<div class="lk-staff__card-contact-wrapper">
										<p class="lk-staff__card-contact-label">
											Клиенты сотрудника
										</p>
										<div class="lk-staff__card-contact">
											УрФО, Москва, ООО «Стин», Пром снаб
										</div>
									</div>

									<div
										class="d-divider d-divider--vertical lk-staff__card-divider"
									></div>

									<div class="lk-staff__card-contact-wrapper">
										<p class="lk-staff__card-contact-label">
											Группы пользователя
										</p>
										<div class="lk-staff__card-contact">Администратор</div>
									</div>

									<div
										class="d-divider d-divider--vertical lk-staff__card-divider"
									></div>

									<button class="lk-staff__card-more">Еще +2</button>

									<div class="lk-staff__card-actions">
										<button class="lk-staff__card-actions-button">
											<i class="d-icon-pen2"></i>
										</button>
										<div
											class="d-divider d-divider--vertical lk-staff__card-actions-divider"
										></div>
										<button class="lk-staff__card-actions-button">
											<i class="d-icon-user-times"></i>
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
  name: 'ProfileStaff',
  components: { Breadcrumbs, Loader }
}
</script>

<style lang="scss">
.organization h1{
  margin-bottom:40px;
}
</style>
