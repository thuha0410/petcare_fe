<template >
<div class="nav-container primary-menu">
		<nav class="navbar navbar-expand-xl w-100">
			<ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
				<li class="nav-item">
					<router-link to="/admin/ql-lich-hen">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-calendar-days"></i>
							</div>
							<div class="menu-title">QL Lịch Hẹn</div>
						</a>
					</router-link>
				</li>

				<li class="nav-item">
					<router-link to="/admin/ql-dich-vu">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-ticket"></i>
							</div>
							<div class="menu-title">QL Dịch Vụ</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-bac-si">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-user-doctor" style="color: #FFD43B;"></i>
							</div>
							<div class="menu-title">QL Bác Sĩ</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-khach-hang">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-users" style="color: #FFD43B;"></i>
							</div>
							<div class="menu-title">QL Khách Hàng</div>
						</a>
					</router-link>
				</li>

				

				<li class="nav-item">
					<router-link to="/admin/ql-luong">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-book"></i>
							</div>
							<div class="menu-title">QL Lương</div>
						</a>
					</router-link>
				</li>

				<li class="nav-item">
					<router-link to="/admin/ql-danh-gia">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-book"></i>
							</div>
							<div class="menu-title">QL Đánh giá</div>
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