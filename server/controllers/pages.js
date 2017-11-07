const Page  = require('../models/page');

const index = (req, res, next) => {
  Page.find()
    .then(pages => res.status(200).json(pages))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Page.findOne({ slug: req.params.slug })
    .then(page => res.status(200).json(page))
    .catch(err => next(err));
};

const create = (req, res, next) => {
  if (!req.body.title) return res.status(422).json({
    message: 'Title is required!'
  });

  if (!req.body.content) return res.status(422).json({
    message: 'Content is required!'
  });

  let title = req.body.title;
  let slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
  let content = req.body.content;

  Page.findOne({ slug: slug })
    .then(page => {
      if (page) return res.status(409).json({
        message: 'Page already exists!'
      });

      const newPage = new Page();
      newPage.title = title;
      newPage.slug = slug;
      newPage.content = content;
      newPage.sidebar = false;

      newPage.save()
        .then(() => res.status(201).json(newPage))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

const edit = (req, res, next) => {
  Page.findById(req.params.id)
    .then(page => {
      if (!page) return res.status(404).json({
        message: 'Page not found!'
      });
      res.status(200).json(page);
    })
    .catch(err => next(err));
};

const update = (req, res, next) => {
  if (!req.body.title) return res.status(422).json({
    message: 'Title is required!'
  });

  if (!req.body.content) return res.status(422).json({
    message: 'Content is required!'
  });

  let id = req.params.id;
  let title = req.body.title;
  let slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
  let content = req.body.content;

  Page.findOne({ slug: slug, _id: { $ne: id } })
    .then(p => {
      if (p) return res.status(409).json({
        message: 'Page with same title exists!'
      });

      Page.findById(id)
        .then(page => {
          if (!page) return res.status(404).json({
            message: 'Page doesn\'t exists!'
          });

          page.title = title;
          page.slug = slug;
          page.content = content;

          page.save()
            .then(() => res.status(201).json(page))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  Page.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json({
      message: 'Page deleted successfully'
    }))
    .catch(err => next(err));
};

module.exports = {
  index,
  show,
  create,
  edit,
  update,
  destroy
};
