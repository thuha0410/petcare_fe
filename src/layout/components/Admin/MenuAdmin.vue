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
							<div class="parent-icon"><i class="fa-solid fa-user-doctor" ></i>
							</div>
							<div class="menu-title">QL Bác Sĩ</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-khach-hang">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-users" ></i>
							</div>
							<div class="menu-title">QL Khách Hàng</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-pet">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-paw"></i>
							</div>
							<div class="menu-title">QL Pet</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-nha-cung-cap">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-truck"></i>
							</div>
							<div class="menu-title">QL Nhà Cung Cấp</div>
						</a>
					</router-link>
				</li>

				

				<li class="nav-item">
					<router-link to="/admin/ql-luong">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-money-check-dollar" ></i>
							</div>
							<div class="menu-title">QL Lương</div>
						</a>
					</router-link>
				</li>

				<li class="nav-item">
					<router-link to="/admin/ql-danh-gia">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-regular fa-face-smile-beam" ></i>
							</div>
							<div class="menu-title">QL Đánh giá</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-kho">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-house-medical"></i>
							</div>
							<div class="menu-title">QL Kho</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-ncc">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-house-medical"></i>
							</div>
							<div class="menu-title">QL Nhà Cung Cấp</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/hoa-don">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-flag-checkered"></i>
							</div>
							<div class="menu-title">QL Hoá Đơn</div>
							<div class="menu-title">Quản lý hóa đơn</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/doanh-thu">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-flag-checkered"></i>
							</div>
							<div class="menu-title">Doanh thu</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/phan-quyen">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-users" ></i>
							</div>
							<div class="menu-title">Phân Quyền</div>
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