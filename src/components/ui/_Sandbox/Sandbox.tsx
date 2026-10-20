import styles from './Sandbox.module.css';

const Sandbox = () => {
  return (
    <div>
      <h1>Sandbox</h1>
      <p>Some text here</p>
      <div className={styles.sandbox}>Some text second here</div>
    </div>
  );
};

export default Sandbox;
