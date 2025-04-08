<template>
	<div class="nav-container primary-menu">
		<button class="scroll-btn left" onclick="scrollMenu(-200)">❮</button>
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
					<router-link to="/admin/ql-loai-dich-vu">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-brands fa-paypal"></i>
							</div>
							<div class="menu-title">QL Loại Dịch Vụ</div>
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
							<div class="parent-icon"><i class="fa-solid fa-user-doctor"></i>
							</div>
							<div class="menu-title">QL Bác Sĩ</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/ql-khach-hang">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-solid fa-users"></i>
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
							<div class="parent-icon"><i class="fa-solid fa-money-check-dollar"></i>
							</div>
							<div class="menu-title">QL Lương</div>
						</a>
					</router-link>
				</li>

				<li class="nav-item">
					<router-link to="/admin/ql-danh-gia">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="fa-regular fa-face-smile-beam"></i>
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
							<div class="parent-icon"><i class="fa-solid fa-users"></i>
							</div>
							<div class="menu-title">Phân Quyền</div>
						</a>
					</router-link>
				</li>
			</ul>
		</nav>
		<button class="scroll-btn right" onclick="scrollMenu(200)">❯</button>
	</div>
</template>
<script>
function scrollMenu(distance) {
	const menu = document.getElementById('navbarMenu');
	menu.scrollBy({ left: distance, behavior: 'smooth' });
}
export default {

}
</script>
<style>
.nav-container {
  position: relative;
  display: flex;
  align-items: center;
}
.navbar-nav {
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #007bff #f1f1f1;
  width: 100%;
}

/* Webkit Scrollbar */
.navbar::-webkit-scrollbar {
  height: 8px;
}
.navbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.navbar::-webkit-scrollbar-thumb {
  background: #007bff;
  border-radius: 10px;
}

/* Nút mũi tên */
.scroll-btn {
  background-color: rgba(0,0,0,0.1);
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px 10px;
  z-index: 1;
  color: #007bff;
  transition: 0.2s;
}
.scroll-btn:hover {
  background-color: rgba(0,0,0,0.2);
}

.scroll-btn.left {
  position: absolute;
  left: 0;
}

.scroll-btn.right {
  position: absolute;
  right: 0;
}
</style>