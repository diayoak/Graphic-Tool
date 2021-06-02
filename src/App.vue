<template>
  <div id="workshop">
		<div class="create-tool-box">
			<div class="tool-item-group">
				<div class="tool-title">도구</div>

				<div class="tool-item active" data-value="0">
					<span class="name">펜</span>
					<span class="icon"></span>
				</div>

				<div class="tool-item" data-value="1">
					<span class="name">펜툴</span>
					<span class="icon"></span>
				</div>

				<div class="tool-item" data-value="2">
					<span class="name">선택</span>
					<span class="icon"></span>
				</div>

				<div class="tool-item" data-value="3">
					<span class="name">부분선택</span>
					<span class="icon"></span>
				</div>

				<div class="tool-item" data-value="4">
					<span class="name">텍스트</span>
					<span class="icon"></span>
				</div>

				<div class="tool-item" data-value="5">
					<span class="name">도형</span>
					<span class="icon"></span>
				</div>
			</div>

			<div class="tool-item-group">
				<div class="tool-title">세부옵션</div>
				
				<div class="font-size-control">
					<div class="name">글씨 크기</div>
					<div class="input-control">
						<input type="range" min="1" max="100" step="1" value="16" id="fontSize">
					</div>
				</div>

				<div class="border-size-control">
					<div class="name">테두리 두께</div>
					<div class="input-control">
						<input type="range" min="1" max="100" step="1" value="20" id="borderSize">
					</div>
				</div>

				<div class="font-size-control">
					<div class="name">다각형 각</div>
					<div class="input-control">
						<input type="range" min="3" max="10" step="1" value="3" id="polygonCnt">
					</div>
				</div>

				<div class="background-color-control">
					<div class="name">배경 색상</div>
					<div class="view-color"></div>
				</div>
				
				<div class="border-color-control">
					<div class="name">테두리 색상</div>
					<div class="view-color"></div>
				</div>
			</div>
		</div>

		<div class="workspace">
			
		</div>

		<div class="layout-info-box">
			<div class="info-item-group">
				<div class="info-title">크기</div>

				<div class="info-item">
					W : <span class="width-value">247</span>px
				</div>

				<div class="info-item">
					H : <span class="height-value">247</span>px
				</div>
			</div>

			<div class="info-item-group">
				<div class="info-title">위치</div>

				<div class="info-item">
					X : <span class="x-value">837</span>px
				</div>

				<div class="info-item">
					Y : <span class="y-value">33</span>px
				</div>
			</div>

			<div class="layout-item-group">
				<div class="layout-title">레이어</div>
				
				<div class="layout-item">
					<div class="icon"></div>
					<div class="name">테스트 문구입니다.</div>
				</div>

				<div class="layout-item">
					<div class="icon"></div>
					<div class="name">도형 1</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import '@/assets/js/lib.js'
// import '@/assets/css/style.css'
// import '@/assets/js/BrushTool.js'
// import '@/assets/js/PenTool.js'
// import '@/assets/js/SelectTool.js'
// import '@/assets/js/PolygonTool.js'
// import '@/assets/js/TextTool.js'
// import '@/assets/js/EditPointer.js'
// import '@/assets/js/app.js'

export default {
  name: 'App',
  created () {

  }
}
</script>

<style lang="scss">
@import './assets/css/common.css';
@import './assets/css/style.css';

</style>
