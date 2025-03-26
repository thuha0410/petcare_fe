<template >
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap" rel="stylesheet">
<div class="topbar d-flex align-items-center">
		<nav class="navbar navbar-expand">
			<div class="topbar-logo-header">
				<div class="">
					<img style='transition: box-shadow 0.3s ease-in-out;'  src="https://res.cloudinary.com/dd1p908gm/image/upload/v1742909921/Untitled_Design-removebg-preview_tqlscl.png" class="logo-icon" alt="logo icon">
				</div>
				<div class="">
					<h4 class="logo-text" style="font-size: 25px;font-weight: bold;font-family: 'Fredoka', sans-serif; color: yellow; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">PET CARE</h4>
				</div>
			</div>
			<div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
			<div class="search-bar flex-grow-1">
				<div class="position-relative search-bar-box">
					<input type="text" class="form-control search-control" placeholder="Tìm Kiếm?">
					<span class="position-absolute top-50 search-show translate-middle-y"><i
							class='bx bx-search'></i></span>
					<span class="position-absolute top-50 search-close translate-middle-y"><i
							class='bx bx-x'></i></span>
				</div>
			</div>

			<div class="user-box dropdown">
				<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
					role="button" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1742909921/Untitled_Design-removebg-preview_tqlscl.png" class="user-img" alt="user avatar">
					<div class="user-info ps-3">
						<p class="user-name mb-0">PET CARE</p>
						<p class="designattion mb-0">Admin</p>
					</div>
				</a>
				<ul class="dropdown-menu dropdown-menu-end">
					<li>
						<router-link to="/admin/profile">
							<a class="dropdown-item" href="/admin/profile"><i class="bx bx-user"></i><span>Profile</span></a>
						</router-link>
					</li>
					<li><a class="dropdown-item" href="javascript:;"><i
								class='bx bx-log-out-circle'></i><span>Logout</span></a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>
<script>
export default {
    
}
</script>
<style >
    
</style>