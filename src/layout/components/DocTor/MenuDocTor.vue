<template>
	<div class="nav-container primary-menu">
		<nav class="navbar navbar-expand-xl w-100">
			<ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
				<li class="nav-item">
					<router-link to="/doctor/xem-ho-so-benh-an">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-calendar-days"></i>
							</div>
							<div class="menu-title">Hồ sơ bệnh án</div>
						</a>
					</router-link>
				</li>

				<li class="nav-item">
					<router-link to="/doctor/ke-don-thuoc">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-ticket"></i>
							</div>
							<div class="menu-title">Kê đơn thuốc</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/doctor/xem-lich">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-user-doctor"></i>
							</div>
							<div class="menu-title">Lịch hẹn</div>
						</a>
					</router-link>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script>
export default {

}
</script>
<style></style>