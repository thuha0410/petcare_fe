<template >
<div class="nav-container primary-menu">
		<div class="mobile-topbar-header">
			<div>
				<img src="../../assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
			</div>
			<div>
				<h4 class="logo-text">Rukada</h4>
			</div>
			<div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
			</div>
		</div>
		<nav class="navbar navbar-expand-xl w-100">
			<ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
				<li class="nav-item">
					<router-link to="/">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="bx bx-home-circle"></i>
							</div>
							<div class="menu-title">QL Lịch Hẹn</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/khach-hang/bai-viet">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-book"></i>
							</div>
							<div class="menu-title">QL Dịch Vụ</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-thanh-toan">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-money-bill"></i>
							</div>
							<div class="menu-title">Quản lý thanh toán</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-bao-cao">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-flag-checkered"></i>
							</div>
							<div class="menu-title">Quản lý báo cáo</div>
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
<style >
    
</style>