using {cuid, managed} from '@sap/cds/common';

namespace bookstore.db;

entity Books : cuid, managed {
    title       : String;
    gener       : String;
    pages       : Integer;
    publishedAt : Date;
    price       : Decimal(9, 2);
    stock       : Integer;
    status      : Association to BookStatus;
    author      : Association to Authors;
    Chapters    : Composition of many Chapters
                      on Chapters.book = $self;
}

type BookStatusCode : String(1) enum {
    Available = 'A';
    LowStock = 'L';
    Unavailable = 'U';
}

entity BookStatus {
    key code        : BookStatusCode;
        criticality : Integer;
        displayText : String;
}

entity Authors : cuid, managed {
    name  : String;
    books : Association to many Books
                on books.author = $self;
}

entity Chapters : cuid, managed {
    key book   : Association to Books;
        number : Integer;
        title  : String;
        pages  : Integer;
}
