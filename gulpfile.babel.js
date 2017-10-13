import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';

gulp.task('default', () => {
  gulp
    .src('index.js')
    .pipe(eslint())
    .pipe(eslint.failOnError())
    .pipe(babel({
      presets: ['env', 'flow'],
    }))
    .pipe(gulp.dest('build'));
});
