const issueService = require("../services/issueService");
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const ISSUE = require("../constants/errorMessages/issue");
const { toLendBookInput } = require("../DTOs/issueDTO");

// POST /api/v1/issues/lend
const lendBook = async (req, res, next) => {
  try {
    const input = toLendBookInput(req.body);

    await issueService.lendBook(input, req.user);

    return res.status(STATUS.CREATED).json({
      code: STATUS.CREATED,
      status: STATUS_TEXT[STATUS.CREATED],
      message: ISSUE.CREATED,
      //data: [],
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/issues
const getIssues = async (req, res, next) => {
  try {
    const result = await issueService.getIssues(req.query, req.user);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: ISSUE.FETCH_OK,
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
      },
    });
    
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/issues/:id/return
const returnBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(STATUS.BAD_REQUEST).json({
        code: STATUS.BAD_REQUEST,
        status: STATUS_TEXT[STATUS.BAD_REQUEST],
        message: ISSUE.INVALID_ID,
      });
    }

    await issueService.returnBook(id, req.user);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: ISSUE.RETURNED,
      //data: [],
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteIssue = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    await issueService.deleteIssue(id, req.user);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: ISSUE.DELETED,
      //data: [],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { lendBook, getIssues, returnBook, deleteIssue };