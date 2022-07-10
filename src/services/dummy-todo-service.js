export default class DummyTodoService {
  data = [
    { id: 1, label: "Drink Coffee", important: false, done: false },
    { id: 2, label: "Learn React", important: true, done: false },
    { id: 3, label: "Make Awesome App", important: false, done: false }
  ];

  getList() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          reject(new Error("Error load list from server"));
        } else {
          resolve(this.data);
        }
      }, 700);
    });
  }
}
