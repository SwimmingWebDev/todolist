const openBtn = document.getElementById("open_modal");

const closeBtn = document.getElementById("close_modal");
const modalWrapper = document.getElementById("modal_wrapper");

const openModal = () => {
  modalWrapper.style.display = "block";
};

const hideModal = () => {
  modalWrapper.style.display = "none";
};

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", hideModal);

modalWrapper.addEventListener("click", (event) => {
  if (event.target.id === "modal_wrapper") {
    hideModal();
  }
});
