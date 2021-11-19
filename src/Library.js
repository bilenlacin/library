import styles from './Library.module.css';
import { LoadingIcon, UpButton, DownButton } from './Icons';
import React from 'react';
import { useEffect, useState } from 'react';

const Book = ({ title, author, publicationYear }) => {
  return (
    <div className={styles.book}>
      <h2 className={styles.bookTitle}>{title}</h2>
      <p className={styles.bookDescription}>
        Published by <strong>{author}</strong> in <em>{publicationYear}</em>
      </p>
    </div>
  );
};

const Library = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [books, setBooks] = useState([]);
  const [searching, setSearching] = useState('');

  useEffect(() => {
    setTimeout(function () {
      fetch('http://localhost:3000/books.json')
        .then((response) => response.json())
        .then((data) => setBooks(data.books), setIsLoading(false));
    }, 2000);
  }, []);

  const oldest = (books) => {
    const old = books
      .slice()
      .sort((a, b) => a.publicationYear - b.publicationYear);
    return old;
  };
  const newest = (books) => {
    const old = books
      .slice()
      .sort((a, b) => b.publicationYear - a.publicationYear);
    return old;
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.sort}>
          <span className={styles.sortLabel}>Sort by publication year</span>
          <span>
            <UpButton
              onClick={() => setBooks(oldest(books))}
              className={styles.arrow}
            />
            <DownButton
              onClick={() => setBooks(newest(books))}
              className={styles.arrow}
            />
          </span>
        </div>

        <input
          type='search'
          id='search'
          placeholder='Search books...'
          className={styles.search}
          onChange={(e) => setSearching(e.target.value)}
          value={searching}
        />
      </header>
      <main>
        <h1>Book library</h1>
        {isLoading ? <LoadingIcon /> : <div> </div>}
        {books
          .filter((book) => {
            if (searching === null) {
              return book;
            } else if (
              book.author.toLowerCase().includes(searching.toLowerCase()) ||
              book.title.toLowerCase().includes(searching.toLowerCase())
            ) {
              return book;
            }
          })
          .map((book) => {
            return (
              <Book
                title={book.title}
                author={book.author}
                publicationYear={book.publicationYear}
              />
            );
          })}
      </main>
    </div>
  );
};

export default Library;
